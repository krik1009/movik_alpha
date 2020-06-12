import React from 'react'
import axios from 'axios'
const apiKey = 685517118446811
const apiSecret = 'uxNSftZ_N8qZpLgiveUlbPzs2KI'
// const uploadUrl = `https://api.cloudinary.com/v1_1/dfeirxlea/auto/upload&api_key=${apiKey}&api_secret=${apiSecret}`
const uploadUrl = 'https://api.cloudinary.com/v1_1/dfeirxlea/video/upload/'
const uploadPreset = "ydhktetw"

class VideoUpload extends React.Component {
  state = {
    video: null
  }
 
  handleUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    // data.append('upload_preset', uploadPreset)
    // timestamp: 1315060510
// public_id: sample_image
// api_key: 1234
// eager: w_400,h_300,c_pad|w_260,h_200,c_crop
// file: https://www.example.com/sample.jpg
// signature: bfd09f95f331f558cbd1320e67aa8d488770583e
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