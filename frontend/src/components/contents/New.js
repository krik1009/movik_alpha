//! create tags, categories

import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import ImageUpload from '../common/ImageUpload'
import VideoUpload from '../common/VideoUpload'
import { uploadContent, getAllTags, getAllCategories, createCategory, createTag } from '../../lib/api'
import { getUserId } from '../../lib/auth'


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
      lang: '',
      color: '', 
      tags: '',
      categories: ''
    },
    tagOptions: [],
    categoryOptions: [],
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
    this.setState({ tagOptions, categoryOptions })
  }

  handleChange = e => {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSelectCategories = async (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()

    const categories = await getAllTags()
    const addedCategories = newValue.map( (item, i) => {
      if (typeof(item.value) === 'string') item.value = categories.length + i
      return item.value
    })
    const formData = { ...this.state.formData, categories: addedCategories }
    this.setState({ formData })
  }

  handleSelectTags = async (newValue, actionMeta) => {
    console.group('Value Changed')
    console.log(newValue)
    console.log(`action: ${actionMeta.action}`)
    console.groupEnd()

    const tags = await getAllTags()
    const addedTags = newValue.map( (item, i) => {
      if (typeof(item.value) === 'string') item.value = tags.length + i
      return item.value
    })
    const formData = { ...this.state.formData, tags: addedTags }
    this.setState({ formData })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const categories = await getAllCategories()
      const newCategories = this.state.formData.categories.filter( item => item.id > categories[categories.length - 1].id )
      console.log(newCategories)
      createCategory(newCategories)

      const tags = await getAllTags()
      const newTags = this.state.formData.tags.filter( item => item.id > tags[tags.length - 1].id )
      createTag(newTags)
      uploadContent(this.state.formData)
      const userId = getUserId()
      this.props.history.push(`/profiles/${userId}`)
    } catch (err) {
      this.setState({ errors: err })
    } 
  }


  render() {
    const { formData, errors, tagOptions, categoryOptions } = this.state
    console.log(errors)

    return (
      <div className="register" style={{ 
        backgroundImage: 'url(https://img.freepik.com/free-photo/happy-people-dance-nightclub-party-concert_31965-606.jpg?size=626&ext=jpg)',
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
                    <VideoUpload
                      onChange={this.handleChange}
                      name="video"
                    />
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