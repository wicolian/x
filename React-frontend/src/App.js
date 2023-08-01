import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    title: '',
    content: '',
    image: null,
    imagePreview: null,
    audio: null,
    audioPreview: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    this.setState({
      image: selectedImage,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imagePreview: reader.result,
      });
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  handleAudioChange = (e) => {
    const selectedAudio = e.target.files[0];
    this.setState({
      audio: selectedAudio,
    });
  
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        audioPreview: reader.result,
      });
    };
    if (selectedAudio) {
      reader.readAsDataURL(selectedAudio);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('audio_file', this.state.audio, this.state.audio.name);
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    let url = 'http://localhost:8000/api/posts/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          window.alert('Form submitted successfully!');
          this.setState({
            title: '',
            content: '',
            image: null,
            imagePreview: null,
            audio: null,
            audioPreview: null,
          });
          window.location.reload();
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required/>

          </p>

          <p>
            {/* Image preview */}
            {this.state.imagePreview && <img src={this.state.imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
          </p>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>

          <p>
             {/* Audio preview */}
             {this.state.audioPreview && <audio controls src={this.state.audioPreview} />}
         </p>
        <p>
           <input
               type="file"
               id="audio"
               accept="audio/mpeg, audio/wav, audio/ogg,audio/aac,audio/flac " // Accept all audio file types
               onChange={this.handleAudioChange}
               required
          />
       </p>

          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;