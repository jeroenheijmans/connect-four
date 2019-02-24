/* eslint-disable */
import normalize from '../../node_modules/normalize.css/normalize.css'
import styles from '../css/styles.css'

import { connectFourApp } from "./app/app";

connectFourApp.run(["gameMaster", function(gameMaster) { gameMaster.startNewMatch(); }]);