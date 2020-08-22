import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;

/**
 * iOS com Emulador : localhost
 * iOS com físico: IP da máquina
 * Android com emulador: localhost (adb reverse)
 * Android com emulador: 10.0.2.2 (Android Stduio)
 * Android com emulador: 10.0.3.2 (Genymotion)
 * Android com fisico: IP da máquina
 */