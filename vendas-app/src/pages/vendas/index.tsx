import { Venda } from "@/app/models/vendasModel";
import { Layout } from "@/components";
import { VendasForm } from "@/components/formVendas";


const handleSubmit = (venda: Venda) => {
    console.log(venda)
}

export default function Vendas(){
    return(
        <Layout titulo="Vendas">
          <VendasForm onSubmit={handleSubmit} />
        </Layout>
        
    )
}