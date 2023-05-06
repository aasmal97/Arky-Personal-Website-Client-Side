import { useRef } from "react";

function DownloadButton({
  children,
  className,
  fileName,
  fileType,
  data,
}: {
  children: JSX.Element[] | JSX.Element | string;
  className?: string;
  fileName: string;
  fileType: string;
  data: Blob | string;
}) {
  // create a ref to store the link element
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  function handleDownload() {
    if (!linkRef.current) return;
    // create a URL that points to the data
    const url = typeof data === "string" ? data : URL.createObjectURL(data);
    // create a link element to download the data
    // linkRef.current.href = url;
    // linkRef.current.download = `${fileName}
    // set the href attribute of the link element to the URL of the data
    linkRef.current.href = url;

    // set the download attribute of the link element to the desired file name
    linkRef.current.download = `${fileName}.${fileType}`;

    // simulate a click on the link to trigger the download
    linkRef.current.click();
  }

  return (
    <>
      {/* render the button */}
      <button
        className={className}
        onClick={handleDownload}
        aria-label={`download-${fileName}.${fileType}`}
      >
        {children}
      </button>

      {/* render the hidden link element to download file */}
      <a
        ref={linkRef}
        target="_blank"
        rel="noreferrer"
        href=" "
        download
        style={{ display: "none" }}
      >
        {children}
      </a>
    </>
  );
}
export default DownloadButton;
