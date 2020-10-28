import React from 'react'
import PropTypes from 'prop-types'

const PostElement = ({post}) => {
    console.log(post)
    return (
        <div>
            <img className="post__image" src={post.image[0]} alt=""/>
        </div>
    )
}

PostElement.propTypes = {

}

export default PostElement
