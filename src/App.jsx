import { useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);

  const comandos = {
    agenda: "📅 Próximo campeonato da FURIA\n\nCampeonato X - Data: 15 de Maio de 2025\nFique ligado para mais informações!",
    jogadores: "🎯 Jogadores da FURIA - CS2\n\n👑 KSCERATO\n⚡ yuurih\n🎯 chelo\n🧠 arT\n🧊 drop",
    fan: "📣 Você é FURIA até o fim?\n\n🔥 Twitter da FURIA\n🎥 Canal da FURIA no YouTube\n🧢 Loja Oficial",
    info: "ℹ️ Mais informações\n\nFURIA é uma das organizações mais icônicas do CS:GO!\nCriada em 2017, com títulos e uma torcida apaixonada!"
  };

  const respostasIA = [
    { palavraChave: 'melhor jogador', resposta: 'KSCERATO é considerado um dos melhores jogadores da FURIA! 🎯' },
    { palavraChave: 'próximo jogo', resposta: 'O próximo jogo da FURIA é dia 15 de Maio de 2025! 📅' },
    { palavraChave: 'time feminino', resposta: 'Sim! A FURIA também conta com line-ups femininas muito fortes! 👑' },
    { palavraChave: 'art', resposta: 'arT é o IGL lendário da FURIA, conhecido por seu estilo agressivo! 🧠' },
  ];

  const mostrarMenu = () => {
    return (
      <div className="menu">
        {Object.keys(comandos).map((cmd) => (
          <button key={cmd} onClick={() => responderMenu(cmd)} className="menu-button">
            {comandos[cmd].split('\n')[0]}
          </button>
        ))}
      </div>
    );
  };

  const enviarMensagem = () => {
    if (mensagem.trim() !== '') {
      const novaMsg = { autor: 'Você', texto: mensagem };
      const novoHistorico = [...historico, novaMsg];
      setHistorico(novoHistorico);
      setMensagem('');

      const texto = mensagem.toLowerCase();

      if (['oi', 'olá', 'menu', '/start'].includes(texto)) {
        const menuMsg = {
          autor: 'FURIA Bot',
          texto: "🔥 Bem-vindo ao universo da FURIA!\nO que você quer saber?",
          isMenu: true
        };
        setHistorico([...novoHistorico, menuMsg]);
      } else {
        const respostaSimulada = gerarRespostaIA(texto);
        const respostaBot = {
          autor: 'FURIA Bot',
          texto: respostaSimulada,
        };
        setHistorico([...novoHistorico, respostaBot]);
      }
    }
  };

  const responderMenu = (comando) => {
    const resposta = {
      autor: 'FURIA Bot',
      texto: comandos[comando]
    };
    setHistorico(prev => [...prev, resposta]);
  };

  const gerarRespostaIA = (texto) => {
    for (let item of respostasIA) {
      if (texto.includes(item.palavraChave)) {
        return item.resposta;
      }
    }
    return "Estamos buscando essa informação para você! 🔍";
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">FURIA Chatbot 🐆</h1>

      <div className="chat-messages">
        {historico.map((msg, index) => (
          <div key={index} className={msg.autor === 'Você' ? 'message user' : 'message bot'}>
            <div>
              <strong>{msg.autor}:</strong> {msg.texto}
            </div>
            {msg.isMenu && mostrarMenu()}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>
    </div>
  );
}

export default App;
