//!  video transformation - 100mb

import React from 'react'
import CreatableSelect from 'react-select/creatable'
import ImageUpload from '../common/ImageUpload'

import { getSingleUser, uploadContent, getAllTags, getAllCategories, createCategory, createTag } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { backgroundImages } from '../../styles/backgroundImages'
// import { cloudinary } from 'cloudinary'
// import { createUploadWidget } from 'cloudinary-core'
// import VideoUpload from '../common/VideoUpload'
// import axios from 'axios'
// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react'

// const cloudinaryUrl = process.env.CLOUDINARY_URL
// const uploadUrl = process.env.REACT_APP_VIDEO_UPLOAD_URL
// const baseUrl = process.env.CLOUDINARY_API_BASE_URL
const cloudName = process.env.REACT_APP_CLOUD_NAME
const uploadPreset = process.env.REACT_APP_VIDEO_UPLOAD_PRESET


class New extends React.Component {
  state = {
    formData: {
      title: '',
      description: '',
      thumbnail: '',
      video: '',
      duration: '',
      height: '',
      width: '',
      lang: 'en',
      color: 'mlt', 
      tags: [],
      categories: []
    },
    tagOptions: [],
    categoryOptions: [],
    profile: '',
    errors: {}
  }

  colorOptions = [
    { value: 'mlt',  label: 'Multicolors' },
    { value: 'grs', label: 'Grayscale' },
    { value: 'trs', label: 'Transparent' },
    { value: 'rd', label: 'Red' },
    { value: 'or', label: 'Orange' },
    { value: 'yl',  label: 'Yellow' },
    { value: 'grn', label: 'Green' },
    { value: 'tqs', label: 'Turquoise' },
    { value: 'bl',  label: 'Blue' },
    { value: 'llc', label: 'Lilac' },
    { value: 'pk',  label: 'Pink' },
    { value: 'wh',  label: 'White' },
    { value: 'gry', label: 'Gray' },
    { value: 'blk', label: 'Black' },
    { value: 'br',  label: 'Brown' }
  ]

  langOptions = [
    { value: 'en', label: 'English'},
    { value: 'sp', label: 'Spanish'},
    { value: 'fr', label: 'French'},
    { value: 'kr', label: 'Korean'},
    { value: 'ma', label: 'Mandarin'},
    { value: 'ja', label: 'Japanese'}
  ]

  returnObj = (label, value) => {
    return { label: label, value: value }
  }

  async componentDidMount() {
    const tags = await getAllTags()
    const tagOptions = tags.map( item => this.returnObj(item.name.toLowerCase(), item.id))
    const categories = await getAllCategories()
    const categoryOptions = categories.map( item => this.returnObj(item.name.toLowerCase(), item.id))
    const profile = await getSingleUser(getUserId())
    this.setState({ tagOptions, categoryOptions, profile })
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  uploadVideo = () => {
    const myWidget = window.cloudinary.createUploadWidget({
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      publicId: `${this.state.profile.id}_${this.state.profile.uploaded_contents.length + 1}`,
      maxFiles: 1,
      showAdvancedOptions: false,

      // preBatch: (cb, data, result) => {
      //   console.log(cb, data)
      //   if (result.info.file.size >= 100000000 ) {
      //     cb({ cancel: true })
      //   }
      //   else { 
      //     cb()
      //   }
      // }
    }, (error, result) => {
        console.log(error, result)
        // const publicId = `${this.state.profile.id}_${this.state.profile.uploaded_contents.length + 1}`
        // if (result.size && result.size >= 100000000) {
        //   axios.post(`${baseUrl}/video/upload/w_0.5/${publicId}`)
        // }

        if (result.event === "success") {
          const formData = { 
            ...this.state.formData, 
            video: result.info.secure_url,
            thumbnail: result.info.thumbnail_url,
            height: result.info.height,
            width: result.info.width
          }
          this.setState({ formData })
        }

        if (result.event === "queues-end") {
          const formData = { 
            ...this.state.formData, 
            title: result.info.files[0].name
          }
          this.setState({ formData })
        }
      }
    )
    myWidget.open()
  }

  handleSelectCategories = (newValue, _actionMeta) => {
    let addedCategories
    const newPk = this.state.categoryOptions.sort((a, b) => a.value - b.value)[this.state.categoryOptions.length - 1].value
    if (newValue) {
      newValue.map( (item, i) => {
        if (item.__isNew__) createCategory({ pk: newPk + i, name: item.value })
      })
      addedCategories = newValue.map( (item, i) => {
        if (item.__isNew__) item.value = newPk + i
        return item.value
      })
    }
    const formData = { ...this.state.formData, categories: addedCategories }
    this.setState({ formData })
  }

  handleSelectTags = (newValue, _actionMeta) => {
    let addedTags
    const newPk = this.state.tagOptions.sort((a, b) => a.value - b.value)[this.state.tagOptions.length - 1].value
    if (newValue) {
      newValue.map( (item, i) => {
        if (item.__isNew__) createTag({ pk: newPk + i, name: item.value })
      })
      addedTags = newValue.map( (item, i) => {
        if (item.__isNew__) item.value = newPk + i
        return item.value
      })
    }
    const formData = { ...this.state.formData, tags: addedTags }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const userId = getUserId()
    try {
      await uploadContent(this.state.formData)
      const profile = await getSingleUser(userId)
      this.setState({ profile })
      this.props.history.push(`/profiles/${userId}`)
    } catch (err) {
      this.setState({ errors: err })
    } 
  }

  render() {
    const { formData, errors, tagOptions, categoryOptions, profile } = this.state
    console.log(this.state)

    return (
      <div className="register" style={{
        backgroundImage: `url(${backgroundImages[13]})`,
        backgroundPosition:'center', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 500
        }}>
        <section className="section">
          <div className="container box" style={{ maxWidth: '60%', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
            <h1 className="title">Upload</h1>
            <hr />

             <div className="columns">
               <form onSubmit={this.handleSubmit} className="column">
                 <div className="field">
                   <label className="label">Title</label>
                   <div className="control">
                     <input
                      className={`input ${errors.title ? 'is-danger' : ''}`}
                      placeholder="Title"
                      name="title"
                      onChange={this.handleChange}
                      value={formData.title}
                    />
                  </div>
                  {errors.title && <small className="help is-danger">Title is required</small>}
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      type="textarea"
                      className={`input ${errors.description ? 'is-danger' : ''}`}
                      placeholder="Description"
                      name="description"
                      onChange={this.handleChange}
                      value={formData.description}
                    />
                  </div>
                  {errors.description && <small className="help is-danger">Description is required</small>}
                </div>

                <div className="field">
                  <label className="label">Thumbnail</label>
                  <div className="control">
                    <ImageUpload
                      onChange={this.handleChange}
                      name="thumbnail"
                    />
                  </div>
                  {errors.password && <small className="help is-danger">Thumbnail is required</small>}
                </div>

                <div className="field">
                  <label className="label">Video</label>
                  <div className="control">
                    {/* <input
                      className="input"
                      type="file"
                      value={formData.video}
                      onChange={this.handleVideoUpload}
                      name="video"
                    /> */}
  
                    {/* <VideoUpload
                          onChange={this.handleChange}
                          name="video"
                    /> */}
                    <button 
                      className="cloudinary-button"
                      onClick={this.uploadVideo} 
                      name="video"
                      >Upload files</button>
                  </div>
                  {errors.video && <small className="help is-danger">This fieid is required</small>}
                </div>

                <div className="field">
                  <label className="label">Duration (in sec)</label>
                  <div className="control">
                    <input
                      type="number"
                      className={`input ${errors.duration ? 'is-danger' : ''}`}
                      placeholder="Duration"
                      name="duration"
                      onChange={this.handleChange}
                      value={formData.duration}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Height</label>
                  <div className="control">
                    <input
                      type="number"
                      className={`input ${errors.height ? 'is-danger' : ''}`}
                      placeholder="Height"
                      name="height"
                      onChange={this.handleChange}
                      value={formData.height}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Width</label>
                  <div className="control">
                    <input
                      type="number"
                      className={`input ${errors.width ? 'is-danger' : ''}`}
                      placeholder="Width"
                      name="width"
                      onChange={this.handleChange}
                      value={formData.width}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Language</label>
                  <div className="select">
                    <select 
                      name="lang" 
                      onChange={this.handleChange}
                      value={formData.lang}
                      style={{ minWidth: 300 }}
                    >
                      <option disabled value=""></option>
                      {this.langOptions.map( (item, i) => (
                        <option value={item.value} key={i}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Key Color</label>
                  <div className="select">
                    <select
                      name="color" 
                      onChange={this.handleChange}
                      value={formData.color}
                      style={{ minWidth: 300 }}
                      >
                      <option disabled value=""></option>
                      {this.colorOptions.map( (item, i) => (
                        <option value={item.value} key={i}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Categories</label>
                  <div className="control">
                    <CreatableSelect
                      isMulti
                      onChange={this.handleSelectCategories}
                      options={categoryOptions}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Tags</label>
                  <div className="control">
                    <CreatableSelect
                      isMulti
                      onChange={this.handleSelectTags}
                      options={tagOptions}
                    />
                  </div>
                </div>

                <div className="field">
                  <button
                    type="submit"
                    className="button is-fullwidth is-black">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default New