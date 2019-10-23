import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../art89.JPG.png'
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams()
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId)
            return (
                <div className="col-sm-4">
                    <Link to={`/streams/edit/${stream.id}`} className="btn btn-sm btn-secondary mr-1">
                        Edit
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="btn btn-sm btn-danger mr-1">
                        Delete
                    </Link>
                </div>
            )
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <Link className="" to={`/streams/${stream.id}`}>
                    <div className="container border-primary p-2 bg-primary text-white mb-3" key={stream.id}>
                        <div className="row">
                            <div className="col-sm-4">

                                {stream.title}

                            </div>

                            <div className="col-sm-4 mb-2">
                                {stream.description}
                            </div>

                            {this.renderAdmin(stream)}


                        </div>
                    </div>
                </Link>
            )
        })
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div className="mx-auto text-center mt-4 mb-4">
                    <Link to="/streams/new" className=" btn btn-primary">
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="mx-4 text-center mb-4">
                <img className="img mx-auto d-block" src={logo} alt="The Artist Club 89 Logo" />
                <div className="container">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList)