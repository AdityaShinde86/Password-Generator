import { useCallback, useEffect, useRef, useState } from 'react'

export default function App() {
  const [length, setLength] = useState(12)
  const [num, setNum] = useState(true)
  const [char, setChar] = useState(true)
  const [pass, setPass] = useState("")
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)
   
  const passGen = useCallback(() => {
    let password = ''
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) string += "0123456789"
    if(char) string += "!@#$%^&*-_+=[]{}~`"
    for (let i = 0; i < length; i++) {
      let gen = Math.floor(Math.random() * string.length)
      password += string.charAt(gen)
    }
    setPass(password)
  }, [length, num, char])

  const copyText = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(pass)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [pass])

  useEffect(() => { passGen() }, [length, num, char, passGen])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Secure Password Generator
          </h1>
          
          <div className="flex shadow-lg rounded-lg overflow-hidden mb-6">
            <input 
              type="text" 
              value={pass}
              className="outline-none w-full py-3 px-4 bg-gray-700 text-white text-lg"
              placeholder="Your secure password"
              readOnly
              ref={passwordRef}
            />
            <button 
              onClick={copyText}
              className={`outline-none px-4 shrink-0 transition-all duration-300 ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-gray-300">Length: {length}</label>
                <span className="text-cyan-400 font-mono">{length}</span>
              </div>
              <input 
                type="range" 
                min={5} 
                max={50} 
                value={length}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                onChange={(e) => { setLength(e.target.value) }}
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  checked={num}
                  id="numberInput"
                  onChange={() => setNum(prev => !prev)}
                  className="w-5 h-5 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="numberInput" className="ml-2 text-gray-300">Include Numbers</label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  checked={char}
                  id="characterInput"
                  onChange={() => setChar(prev => !prev)}
                  className="w-5 h-5 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="characterInput" className="ml-2 text-gray-300">Special Characters</label>
              </div>
            </div>
            
            <button
              onClick={passGen}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              Generate New Password
            </button>
          </div>
        </div>
        
        <div className="bg-gray-900/50 p-4 text-center text-gray-400 text-sm">
          <p>Password strength: {length >= 16 ? 'Strong' : length >= 10 ? 'Good' : 'Weak'}</p>
        </div>
      </div>
    </div>
  )
}