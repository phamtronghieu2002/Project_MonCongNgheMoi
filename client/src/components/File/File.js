import "./file.scss"
import DownloadLink from "react-download-link";
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import PreviewModal from "react-media-previewer";
import { extraTimeStamp, fileIcons, filePreviewLink, extractFileName, extractFileSize, extractFileExtension } from "../../utils/fileUtil";
import { useState } from "react";
export default function File({ messageTime, content }) {


    const FileName = extraTimeStamp(extractFileName(content))
    const fileExtension = extractFileExtension(FileName)
    const fileSize = extractFileSize(content)
    console.log(fileExtension);
    const iconFile = fileIcons.find(item => item?.type.includes(fileExtension))?.icon

    const [isPreview, setIsPreview] = useState(false)
    return (
        <div
            onClick={() => setIsPreview(!isPreview)}
            className="file_container">
            <div className="file_main d-flex">
                <img src={iconFile} />
                <div className="file_infor">
                    <div className="file_name mb-3">
                        {FileName}
                    </div>
                    <div className="file_size d-flex justify-content-between align-items-center">
                        <span className="file_size">{fileSize}</span>
                        <DownloadLink
                            label="Save"
                            filename="http://localhost:8080/files/useCase_DangKi_QuanLiTaiKhoan.docx"
                            exportFile={() => "My cached data"}
                        />
                    </div>
                </div>
            </div>
            {isPreview &&
                <PreviewModal
                    visible={isPreview
                    }
                    setVisible={setIsPreview}
                    urls={[filePreviewLink(FileName)]}
                />
            }
            {isPreview && <button onClick={() => { setIsPreview(false) }} type="button" class="btn-close" aria-label="Close"></button>}
        </div>
    );
}