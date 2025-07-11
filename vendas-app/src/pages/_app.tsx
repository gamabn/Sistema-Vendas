import { AppProps } from 'next/app'
import "primereact/resources/themes/md-light-indigo/theme.css";

//import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
// import 'assets/theme.css'; // Este arquivo não foi encontrado no projeto
import 'bulma/css/bulma.css'
import 'components/loader/loader.css'
import 'styles/custom.css' // Importe seu CSS customizado

function MyApp({ Component, pageProps } : AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
