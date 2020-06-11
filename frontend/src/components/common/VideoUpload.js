import React from 'react'
import axios from 'axios'
const uploadUrl = "https://api.cloudinary.com/v1_1/dfeirxlea/video/upload"
const uploadPreset = "ydhktetw"

class VideoUpload extends React.Component {
  state = {
    video: null
  }

  handleUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    this.setState({
      video: res.data.url
    }, () => {
      this.props.onChange({ target: { name: this.props.name, value: this.state.video } })
    })
  }

  render() {
    const { video } = this.state
    return (
      <div>
        {video ?
      
          <div>
            Uploaded
          </div>
          
          :
          <>
            <label className="label" style={{ fontSize: 10 }}> - Wait for upload to finish before the submit - </label>
            <input
              className="input"
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
      </div>
    )
  }
}

export default VideoUpload