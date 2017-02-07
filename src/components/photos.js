import firebase from 'firebase';
import ImageUploader form 'react-firebase-image-uploader';

class PhotoUpload extends Component {
    state = {
        url: ''
    };

    componentDidMount() {
        firebase.storage().ref('image').child(this.props.filename).getDownloadURL.then(url => this.setState({url}));
    }

    componentWillReceiveProps(next) {
        if (next.filename !== this.props.filename) {
            firebase.storage().ref('image').child(next.filename).getDownloadURL.then(url => this.setState({url}));
        }
    }

    render() {
        return (
            <div>
                {this.props.isUploading && <p>Progress: {this.props.progress}</p>}
                {this.state.url && <img src={this.state.url} />}
            </div>
        );
    }
}
export default PhotoUpload;
