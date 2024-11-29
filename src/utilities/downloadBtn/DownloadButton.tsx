import { ButtonHTMLAttributes, useRef } from "react";

function DownloadButton({
  children,
  className,
  fileName,
  fileType,
  data,
}: {
  // children: JSX.Element[] | JSX.Element | string;
  children: (
    props?: ButtonHTMLAttributes<HTMLButtonElement>
  ) => React.ReactNode | string;
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
      {children({
        className,
        onClick: handleDownload,
        "aria-label": `download-${fileName}.${fileType}`,
      })}
      {/* render the hidden link element to download file */}
      <a
        ref={linkRef}
        target="_blank"
        rel="noreferrer"
        href={typeof data === "string" ? data : URL.createObjectURL(data)}
        download
        style={{ display: "none" }}
      >
        Download
      </a>
    </>
  );
}
export default DownloadButton;
