import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    const res = await fetch('/api/addSchool', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setMessage('School added successfully!');
      reset();
    } else {
      setMessage('Failed to add school.');
    }
  };

  // Common styles
  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '16px',
    marginBottom: '5px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
    display: 'block',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '13px',
    marginBottom: '8px',
  };

  const buttonStyle = {
    backgroundColor: '#2563eb', // blue
    color: 'white',
    fontWeight: 'bold',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  };

  const messageStyle = {
    marginTop: '15px',
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Add School</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={labelStyle}>School Name</label>
        <input {...register('name', { required: true })} placeholder="Enter school name" style={inputStyle} />
        {errors.name && <div style={errorStyle}>This field is required</div>}

        <label style={labelStyle}>Address</label>
        <input {...register('address', { required: true })} placeholder="Enter address" style={inputStyle} />
        {errors.address && <div style={errorStyle}>This field is required</div>}

        <label style={labelStyle}>City</label>
        <input {...register('city', { required: true })} placeholder="Enter city" style={inputStyle} />
        {errors.city && <div style={errorStyle}>This field is required</div>}

        <label style={labelStyle}>State</label>
        <input {...register('state', { required: true })} placeholder="Enter state" style={inputStyle} />
        {errors.state && <div style={errorStyle}>This field is required</div>}

        <label style={labelStyle}>Contact</label>
        <input type="number" {...register('contact', { required: true })} placeholder="Enter contact" style={inputStyle} />
        {errors.contact && <div style={errorStyle}>This field is required</div>}

        <label style={labelStyle}>Email</label>
        <input type="email" {...register('email_id', { required: true })} placeholder="Enter email" style={inputStyle} />
        {errors.email_id && <div style={errorStyle}>This field is required</div>}

        <label style={labelStyle}>School Image</label>
        <input type="file" {...register('image', { required: true })} style={{ ...inputStyle, padding: '6px' }} />
        {errors.image && <div style={errorStyle}>This field is required</div>}

        <button type="submit" style={buttonStyle}>Add School</button>
      </form>

      {message && <div style={messageStyle}>{message}</div>}
    </div>
  );
}
