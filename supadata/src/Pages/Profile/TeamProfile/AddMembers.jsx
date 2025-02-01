import './style.css';
import excel from '../../../assets/images/excel_image.png';
import { CSVLink } from 'react-csv';
import { useState } from 'react';
import axiosInstance from '../../../Api/Axios';
export default function AddMembers({id}) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');



  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id',id);
    console.log('FormData Entries:', ...formData.entries());
   
    try {
        const response = await axiosInstance.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        });
        setMessage(response.data.message);
    } catch (error) {
      console.error('Upload error:', error);
        setMessage('Error uploading file: ' + error.response.data.error);
    }
    
   
  };

  
  const data = [
    ['Name', 'Email', 'Phone', 'Department', 'Job_title'], 
    [], 
  ];

  return (
    <>
    <div className="DownloadContainer">
      <p className='download_csv'>Download the CSV file to add your Team Members</p>
      <div className='fileCSV'>
        <CSVLink 
          data={data} 
         separator={';'}
          filename="team_members.csv"
        >
          <img src={excel} alt="excel" />
        </CSVLink>
      </div>
    </div>
    <div className="UploadContainer">
    <p className='download_csv'>Next, please upload the CSV file here</p>
    
     <div className='upload'>
     <input type="file" accept='.csv' name='file' onChange={handleFileChange} />
     <button type='submit' className='btn btn-primary' style={{marginTop:'10px'}} onClick={handleUpload}>Upload</button>
     </div>
   
     {message && <p className='text-danger'>{message}</p>}
    </div>
    
    
    </>
  );
}
