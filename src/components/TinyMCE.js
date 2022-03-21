import { useRef, useState, useEffect } from 'react';
import { Paper, TextField, MenuItem, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingCircle from './LoadingCircle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TinyMCE = props => {
  const theme = useTheme();
  const { id } = useParams();
  const editorRef = useRef(null);
  const [type, setType] = useState(' ');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUri = 'http://localhost:4000';
  const swal = withReactContent(Swal)
  const userData = useSelector(state => state.userData);
  const { user } = userData;
  const update = props.update;

  useEffect(() => {
    if (!user || !(user.role === 'writer' || user.role === 'admin')) return;
    const fetchData = async () => {
      const { data } = await axios.get(apiUri + '/idsearch/' + id);
      setTitle(data.article.title);
      setType(data.article.type);
      setContent(data.article.body);
    }
    if (update) fetchData()
    return () => {
      setTitle('');
      setType('');
      setContent('');
    }
  }, [update, id, user])

  const log = async () => {

    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      if (type === ' ') {
        return alert('Төрлийг сонгоно уу');
      }
      if (title.trim() === '') {
        return alert('Гарчигаа оруулна уу');
      }
      const userlocal = JSON.parse(localStorage.getItem('user'));
      const access_token = userlocal.access_token;
      const options = { headers: { 'Authorization': 'Bearer ' + access_token } };
      if (update) {
        try {
          setLoading(true);
          await axios.put(apiUri + '/update/' + id, {
            title: title,
            type: type,
            body: editorContent
          }, options)
          setLoading(false);
          swal.fire('Амжилттай засагдлаа', '', 'success')
        } catch(err){
          setLoading(false);
          swal.fire('Алдаа гарлаа', '', 'error')
        }
      } else {
        await axios.post(apiUri, {
          title: title,
          article: editorContent,
          author: user._id,
          type: type,
        }, options)
        swal.fire('Амжилттай Нийтлэлээ', '', 'success')
      }
    }
  };
  return (
    <Paper className='p-2'>
      {loading && <LoadingCircle />}
      <TextField
        value={type}
        select required
        label='Төрөл'
        color="secondary"
        onChange={(e) => { setType(e.target.value); console.log(e.target.value) }}>
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

      <Editor
        apiKey="gkow2reeuytoqy4avecrytvr7vvpmceqvzndaxl10pcn8pf6"
        onInit={(e, editor) => editorRef.current = editor}
        initialValue={content}
        init={{
          // toolbar: 'undo redo | link image | code', 
          height: 500,
          //   menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          automatic_uploads: true,
          image_title: true,
          file_picker_callback: function (cb, value, meta) {
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = () => {
              let file = this.files[0];
              let reader = new FileReader();
              reader.onload = () => {
                let id = 'blobid' + (new Date()).getTime();
                let blobCache = tinymce.activeEditor.editorUpload.blobCache;
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
      <Button onClick={log} sx={{ border: '1px solid gray', marginX: 'auto', width: 'max-content', display: 'block' }}>
        {update ? 'Засах' : 'Нийтлэх'}
      </Button>
    </Paper>
  );
}
export default TinyMCE