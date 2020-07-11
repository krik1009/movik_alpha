import React from 'react'
import axios from 'axios'
import { cloudinary } from 'cloudinary'
import { createUploadWidget } from 'cloudinary-core'
const cloudinaryUrl = process.env.CLOUDINARY_URL
const uploadUrl = process.env.REACT_APP_VIDEO_UPLOAD_URL
const cloudName = process.env.REACT_APP_CLOUD_NAME
const uploadPreset = process.env.REACT_APP_VIDEO_UPLOAD_PRESET

class VideoUpload extends React.Component {
  state = {
    video: null
  }

  openWidget = async e => {
    const myWidget = window.cloudinary.createUploadWidget({
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      }, (error, result) => {
        console.log(error, result)
        if (result.event === "queues-end") {
          const formData = { 
            ...this.state.formData, 
            height: result.info.files[0].dimensions[1],
            width: result.info.files[0].dimensions[0]
          }
        }
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
        }

        if (result.event === "success") {
          console.log(result.info) // result.info contains data from upload
          // const formData = { ...this.state.formData, 'video': result.info.url }
          // this.setState({ formData })
      }
    })

    myWidget.open()
  }

  handleUpload = async e => {
    // const data = new FormData()
    // data.append('file', e.target.files[0])
    // data.append('upload_preset', uploadPreset)
    // const res = await axios.post(uploadUrl, data)

    window.cloudinary.uploader.unsigned_upload(e.target.files[0], uploadPreset, 
      function(error, result) {console.log(result, error) })
      
    //   () => {
    //   this.setState({ video: })
    // })
    // this.setState({
    //   video: res.data.url
    // }, () => {
    //   this.props.onChange({ target: { name: this.props.name, value: this.state.video } })
    // })
  }

  render() {
    const { video } = this.state
    return (
      
      <div>
        {/* {video ?
      
          <div>
            <img className="image is-64x64" src={image} alt="selected"/>
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
        } */}

        <button className="cloudinary-button" onClick={this.openWidget}>Upload files</button>
        <input
              className="input"
              type="file"
              onChange={this.handleUpload}
            />
      </div>
    )
  }
}

export default VideoUpload