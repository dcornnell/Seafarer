import React from "react";

class Upload extends React.Component {
  state = {};

  onChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  imageUpload = async event => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "jiztc5xj");
    this.setState({ loading: true });
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcornnell/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();

    console.log(file.secure_url);
  };

  render() {
    return (
      <div>
        <input
          name="file"
          type="file"
          onChange={this.imageUpload}
          ref={ref => (this.fileInput = ref)}
        ></input>
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default Upload;
