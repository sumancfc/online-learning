import ReactPlayer from "react-player";
import { Modal } from "antd";

const VideoPreview = ({ modalOpen, setModalOpen, videoPreview }) => (
  <Modal
    title='Single Course Preview'
    visible={modalOpen}
    onCancel={() => setModalOpen(!modalOpen)}
    widht={720}
    footer={null}
  >
    <div className='wrapper'>
      <ReactPlayer
        url={videoPreview}
        playing={modalOpen}
        controls={true}
        width='100%'
        height='100%'
      />
    </div>
  </Modal>
);

export default VideoPreview;
