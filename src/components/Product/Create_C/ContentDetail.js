import React, { Component } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import getChannel, { IKITECH } from "../../../ultis/channel";
import { handleImageUploadBefore } from "../../../ultis/sun_editor";
class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtContent: "",
      isLoaded: true,
      txtContentC: ""
    };

  }


  onChange = (e) => {
    this.setState({ txtContentC: e.target.value })
  }
  handleEditorChange = (editorState) => {
    this.setState({
      txtContent: editorState,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.txtContent !== this.state.txtContent || nextState.txtContentC !== this.state.txtContentC) {
      console.log("đã vào", nextState)
      this.props.handleDataFromContent({ txtContent: nextState.txtContent, txtContentC: nextState.txtContentC })
    }
    if (nextProps.product.description !== this.props.product.description
      || nextProps.product.content_for_collaborator !== this.props.product.content_for_collaborator
      || nextState.isLoaded == true) {
      this.setState({
        txtContent: nextProps.product.description,
        txtContentC: nextProps.product.content_for_collaborator,
        isLoaded: false
      })
    }
    return true
  }

  render() {
    var { txtContent, txtContentC } = this.state;
    console.log(this.state)
    return (
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="form-group">
          <label for="product_name">Mô tả sản phẩm</label>
          <SunEditor
            onImageUploadBefore={handleImageUploadBefore}
            setContents={txtContent}
            showToolbar={true}
            onChange={this.handleEditorChange}
            setDefaultStyle="height: auto"
            setOptions={{
              buttonList: [
                [


                  "undo",
                  "redo",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                  "bold", "underline", "italic", "strike", "subscript", "superscript",
                  "fontColor", "hiliteColor", "textStyle",
                  "removeFormat",
                  "outdent", "indent",
                  "align", "horizontalRule", "list", "lineHeight",
                  "table", "link", "image", "video", "audio",
                  "imageGallery",
                  "fullScreen", "showBlocks", "codeView",
                  "preview", "print",
                  "save", "template"
                ]
              ]
            }}

          />

        </div>

        {
          getChannel() == IKITECH && <div class="form-group">
            <label for="product_name">Nội dung cho cộng tác viên</label>

            <textarea value={txtContentC}
              onChange={this.onChange}
              name="txtContentC" id="input" class="form-control" rows="7" required="required"></textarea>


          </div>
        }
      </div>
    );
  }
}

export default ContentDetail;
