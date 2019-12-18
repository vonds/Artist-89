import React from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {
    constructor(props) {
        super(props)


        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchStream(id)
        this.buildPlayer()

    }

    componentDidUpdate() {
        this.buildPlayer()
    }

    componentWillUnmount() {
        this.player.destroy()
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }

        const { id } = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    colorToImage(color) {
        return `/${color}.jpg`
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { title, description, color, abstract } = this.props.stream
        const image = this.colorToImage(color)
        console.log(image)
        return (
            <div className=" card bg-secondary mb-5 mx-auto text-center p-4" style={{ maxWidth: '60rem' }}>
                <div className="card-title">
                    <h1 className="text-center mt-4">{title}</h1>
                    <h5 className="text-center mb-4">{description}</h5>
                </div>
                <div className="card-body">
                    <video ref={this.videoRef} style={{ width: '100%' }} controls />
                    <img className="img-fluid mx-auto" src={image} alt="" />
                    <p className="text-primary mb-5">{abstract}</p>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)