import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        const { id } = this.props.match.params

        return (
            <React.Fragment className="modal-content">
                <div className="text-center mx-auto">
                    <button onClick={() => this.props.deleteStream(id)} className="btn btn-danger btn-sm mt-2 mb-2 mx-1">Delete</button>
                    <Link to="/" className="btn btn-primary btn-sm mt-2 mb-2 mx-1">Cancel</Link>
                </div>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return (
                <div className="p-2 mx-auto">
                    <p>{'Are you sure you want to this stream?'}</p>
                </div>
            )
        }

        return (
            <div className="p-2 mx-auto">
                <p>{`Are you sure you want to delete the stream with the title: ${this.props.stream.title}?`}</p>
            </div>
        )

    }

    render() {
        return (
            <div>
                <Modal
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)