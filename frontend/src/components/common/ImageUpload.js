import React from 'react'
import axios from 'axios'
const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL
const uploadPreset = process.env.REACT_APP_IMAGE_UPLOAD_PRESET

class ImageUpload extends React.Component {
  state = {
    image: null
  }

  handleUpload = async e => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadUrl, data)
    this.setState({
      image: res.data.url
    }, () => {
      this.props.onChange({ target: { name: this.props.name, value: this.state.image } })
    })
  }

  render() {
    const { image } = this.state
    return (
      <div>
        {image ?
      
          <div>
            <img className="image is-64x64" src={image} alt="selected"/>
          </div>
          
          :
          // <>
          //   <label className="label" style={{ fontSize: 10 }}> - Wait for upload to finish before the submit - </label>
            <input
              className="input"
              type="file"
              onChange={this.handleUpload}
            />
          // </>
        }
      </div>
    )
  }
}

export default ImageUpload