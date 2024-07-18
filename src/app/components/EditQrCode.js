import QrCodeDecorator from "../decorators/qrCodeDecorator";


const EditQrCode = ({ qrCode }) => {
  const qrCodeDecorator = new QrCodeDecorator(qrCode)
  return (
    <div className="w-[860px] h-screen md:h-[860px] md:mt-12 pb-12 rounded-md relative bg-white overflow-scroll">
      <div className="flex justify-center">
        <div className="mt-4">
          <div className="mb-3 flex justify-center w-40">
            <p className="max-w-full text-sm truncate">{qrCodeDecorator.title()}</p>
          </div>
          <div className="bg-white h-40 w-40">
            <img src={qrCode.svgFile.url}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQrCode;

