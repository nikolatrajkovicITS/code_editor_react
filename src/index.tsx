import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react'

const App = () => {
  const serviceRef = useRef<any>()
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');


  const startService = async () => {
    // service gonna use for bundle and transpile code
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })

  }

  useEffect(() => {
    startService();
  }, [])

  const onClick = async () => {
    if (!serviceRef.current) {
      return;
    }

    const result = await serviceRef.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    });

    setCode(result.code)
  }


  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)}> </textarea>

      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <pre>{code}</pre>
    </div>
  )
}

ReactDOM.render(
  <App />, document.querySelector('#root')
)