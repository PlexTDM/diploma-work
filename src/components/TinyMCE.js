import { useRef, useState } from 'react';
import { Paper, TextField , MenuItem, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Editor } from '@tinymce/tinymce-react';
import tinymce from 'tinymce/tinymce';
import axios from 'axios';

const TinyMCE = ()=>{
  // const [value, setValue] = useState('This is the initial content of the editor');
  const theme = useTheme();
  const editorRef = useRef(null);
  // const apiUri = 'http://localhost:4000/';
  const [type, setType] = useState(' ');
  const [title, setTitle] = useState('');
  const log = async () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      console.log(editorContent);
      if(type===' '){
        console.log(type);
        return alert('Төрлийг сонгоно уу');
      }
      if(title.trim()===''){
        return alert('Гарчигаа оруулна уу');
      }
      const { data } = await axios.post('http://localhost:4000/', {
        title: title,
        article: editorContent,
        author: 'John Doe',
        type: type,
      })
      console.log(data);
    }
  };
  return (
    <Paper className='mt-2 p-2'>

      <TextField 
        value={type}
        select required
        label='Төрөл'
        color="secondary"
      onChange={(e)=>{setType(e.target.value); console.log(e.target.value)}}>
        <MenuItem value=" " disabled>Төрөл</MenuItem>
        <MenuItem value="sport">Спорт</MenuItem>
        <MenuItem value="health">Эрүүл Мэнд</MenuItem>
        <MenuItem value="worklife">Ажил Амьдрал</MenuItem>
        <MenuItem value="future">Ирээдүй</MenuItem>
        <MenuItem value="tech">Технологи</MenuItem>
        <MenuItem value="travel">Аялал</MenuItem>
        <MenuItem value="culture">Cоёл</MenuItem>
        
      </TextField>

      <TextField label='Гарчиг' required
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        color="secondary"
      />

      <Editor
        apiKey="gkow2reeuytoqy4avecrytvr7vvpmceqvzndaxl10pcn8pf6"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
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
            input.onchange = ()=>{
              let file = this.files[0];
              let reader = new FileReader();
              reader.onload = ()=>{
                let id = 'blobid' + (new Date()).getTime();
                let blobCache =  tinymce.activeEditor.editorUpload.blobCache;
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
          skin: `${theme.palette.mode === 'dark'?'oxide-dark':''}`,
          content_css: `${theme.palette.mode === 'dark'?'dark':''}`
        }}
        className='mt-4'
      />
      <Button onClick={log}>Log editor content</Button>
    </Paper>
  );
}
export default TinyMCE