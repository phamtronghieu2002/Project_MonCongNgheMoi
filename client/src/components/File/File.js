import "./file.scss"
import DownloadLink from "react-download-link";
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import { extraTimeStamp, fileIcons, fileLink, extractFileName, extractFileSize, extractFileExtension } from "../../utils/fileUtil";
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
            onClick={() => setIsPreview(true)}
            className="">
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
                            filename={fileLink(FileName)}
                            exportFile={() => "My cached data"}
                        />
                    </div>
                </div>
            </div>
            {isPreview &&

                <DocViewer
                    documents={[{ uri: fileLink(FileName) }]}
                    pluginRenderers={DocViewerRenderers}
                />}
            {isPreview && <button onClick={() => { setIsPreview(false) }} type="button" class="btn-close" aria-label="Close"></button>}
        </div>
    );
}