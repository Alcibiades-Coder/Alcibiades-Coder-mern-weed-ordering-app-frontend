import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-green-600 ">
          Disfruta de la mejor Weed Hoy!
        </h1>
        <span className="text-xl">Lo mejor está a un Click de Distancia!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Llega más lejos aún más rápido con Weeder.com!
          </span>
          <span>
            Descarga Weeder App para pedidos más rapidos y recomendaciones
            personalizadas
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
