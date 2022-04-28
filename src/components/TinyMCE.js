import { useRef, useState, useEffect, useContext } from 'react';
import { Paper, TextField, MenuItem, Button, Stack, Menu, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UserContext } from './App';

const TinyMCE = props => {
  const theme = useTheme();
  const { id } = useParams();
  const editorRef = useRef(null);
  const [type, setType] = useState(' ');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [poster, setPoster] = useState('');
  const [urlPoster, setUrlPoster] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const api = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

  const swal = withReactContent(Swal);

  const user = useContext(UserContext);
  const update = props.update;

  const resizeImage = (file, maxSize) => {
    let reader = new FileReader();
    let image = new Image();
    let canvas = document.createElement('canvas');
    const resize = () => {
      let width = image.width;
      let height = image.height;
      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);
      return canvas.toDataURL('image/png');
    };
    return new Promise(resolve => {
      reader.onload = e => {
        image.onload = () => resolve(resize());
        image.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const setImg = e => {
    const reader = new FileReader();
    reader.onload = () => {
      resizeImage(e.target.files[0], 500).then(res => {
        console.log(reader.result.length, res.length);
        setPoster(res);
      })
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (!user || !(user.role === 'writer' || user.role === 'admin')) return;
    const fetchData = async () => {
      const { data } = await axios.get(api + '/idsearch/' + id);
      setTitle(data.article.title);
      setType(data.article.type);
      setContent(data.article.body);
      setPoster(data.article.poster);
    }
    if (update) fetchData()
    return () => {
      setTitle('');
      setType('');
      setContent('');
    }
  }, [update, id, user, api])

  const log = async () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      if (type === ' ') {
        return alert('Төрлийг сонгоно уу');
      }
      if (title.trim() === '') {
        return alert('Гарчигаа оруулна уу');
      }
      if (poster.trim() === '') {
        return alert('Зурагаа оруулна уу');
      }
      const userlocal = JSON.parse(localStorage.getItem('user'));
      const access_token = userlocal.access_token;
      const options = { headers: { 'Authorization': 'Bearer ' + access_token } };
      if (update) {
        try {
          setLoading(true);
          await axios.put(api + '/update/' + id, {
            title: title,
            type: type,
            body: editorContent,
            poster: poster
          }, options).then(res => {
            console.log(res);
            setLoading(false);
            swal.fire('Амжилттай засагдлаа', '', 'success')
          })
        } catch (err) {
          setLoading(false);
          swal.fire('Алдаа гарлаа', '', 'error')
        }
      } else {
        await axios.post(api + '/upload', {
          title: title,
          article: editorContent,
          author: user._id,
          type: type,
          poster: poster
        }, options).then(res => { swal.fire('Амжилттай Нийтлэлээ', '', 'success'); console.log(res) })
          .catch(err => {
            console.log(err, err.response);
            swal.fire('Алдаа гарлаа', err, 'error')
          })
      }
    }
  };


  return user && (user.role === 'writer' || user.role === 'admin') ? (
    <Paper className='p-2 pb-32'>
      {loading && <LoadingCircle />}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        // onClick={()=>setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Button
          variant="contained" sx={{ height: 50, width: 150, ml: 2 }} component="label">Choose File<input type="file" hidden accept="image/*" onChange={e => { setImg(e); setAnchorEl(null) }} />
        </Button>
        <Divider sx={{ my: 2 }} />
        <TextField type='url' variant='filled' hiddenLabel onChange={e => setUrlPoster(e.target.value)} size="small" placeholder='URL' />
        <Button variant="contained" sx={{ height: 'min-content', width: 150, ml: 2 }} onClick={() => { setPoster(urlPoster); setAnchorEl(null) }}>Save</Button>
      </Menu>
      <Stack spacing={2} direction='row'>
        <TextField
          value={type}
          select required
          label='Төрөл'
          color="secondary"
          onChange={e => setType(e.target.value)}>
          <MenuItem value=" " disabled>Төрөл</MenuItem>
          <MenuItem value="politics">Улс Төр</MenuItem>
          <MenuItem value="sport">Спорт</MenuItem>
          <MenuItem value="health">Эрүүл Мэнд</MenuItem>
          <MenuItem value="tech">Технологи</MenuItem>
        </TextField>

        <TextField label='Гарчиг' required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          color="secondary"
        />

        <Button variant="contained" className='ml-4 h-min' onClick={e => setAnchorEl(e.currentTarget)}>{poster ? 'Change Poster' : 'Set Poster'}</Button>
        {poster && <img className='max-w-[50%]' alt='poster' src={poster} />}
      </Stack>

      <Editor
        apiKey="gkow2reeuytoqy4avecrytvr7vvpmceqvzndaxl10pcn8pf6"
        plugins='image preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount'
        onInit={(e, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          // toolbar: 'undo redo | link image | code', 
          height: 500,
          //   menubar: false,
          automatic_uploads: true,
          image_title: true,
          file_picker_callback: (cb) => {
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = e => {
              let file = e.target.files[0];
              let reader = new FileReader();
              reader.onload = () => {
                let id = 'blobid' + (new Date()).getTime();
                let blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                let base64 = reader.result.split(',')[1];
                let blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          skin: `${theme.palette.mode === 'dark' ? 'oxide-dark' : ''}`,
          content_css: `${theme.palette.mode === 'dark' ? 'dark' : ''}`
        }}
        className='mt-4'
      />
      <Button onClick={log} disabled={loading ? true : false} sx={{ border: '1px solid gray', marginX: 'auto', width: 'max-content', display: 'block', marginTop: 5 }}>
        {update ? 'Засах' : 'Нийтлэх'}
      </Button>
    </Paper>
  ) :
    // no 404 page yet ;(
    <Paper>error??</Paper>
}
export default TinyMCE