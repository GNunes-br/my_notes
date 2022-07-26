import { useEffect, useState } from "react"
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native"
import { Nota } from "./src/componentes/Nota"
import NotaEditor from "./src/componentes/NotaEditor"
import { buscaNotas, criaTabela } from './src/servicos/Notas'


export default function App() {
  useEffect(() => {
    criaTabela()
  }, [])

  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])

  async function mostraNotas(){
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }

  return (
    <SafeAreaView style={estilos.container}>

      <FlatList 
        data={notas}
        keyExtractor={(nota) => nota.id}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />}
      />

      <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada}/>
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

