import USAFlag from '@Image/NavigationMenu/NationFlags/usa.png'
import IndiaFlag from '@Image/NavigationMenu/NationFlags/india.png'
import FrenchFlag from '@Image/NavigationMenu/NationFlags/french.png'
import GermanFlag from '@Image/NavigationMenu/NationFlags/german.png'
import NLFlag from '@Image/NavigationMenu/NationFlags/nl.png'
import MexFlag from '@Image/NavigationMenu/NationFlags/mex.png'
import SPFlag from '@Image/NavigationMenu/NationFlags/sp.png'
import ChinaFlag from '@Image/NavigationMenu/NationFlags/china.png'
import RuFlag from '@Image/NavigationMenu/NationFlags/ru.png'
import ROCFlag from '@Image/NavigationMenu/NationFlags/roc.png'
import HKFlag from '@Image/NavigationMenu/NationFlags/hongkong.png'

export const Get_Nation_Flag_Value = (value: string) => {
    switch (value) {
        case "en-US":
        case "en-USA":
        case "eng-US":
        case "eng-USA":
            return USAFlag.src
        case "es-US":
        case "es-MX":
            return MexFlag.src
        case "es-ES":
            return SPFlag.src
        case "de-DE":
            return GermanFlag.src
        case "fr-FR":
        case "fr-GF":
            return FrenchFlag.src
        case "hi-IN":
            return IndiaFlag.src
        case "nl-NL":
        case "nl-BE":
            return NLFlag.src
        case "ru-RU":
            return RuFlag.src
        case "zh-TW":
            return ROCFlag
        case "zh-HK":
            return HKFlag.src
        case "zh-CDO":
        case "zh-CJY":
        case "zh-CMN":
        case "zh-CNP":
        case "zh-CPX":
        case "zh-CSH":
        case "zh-CSP":
        case "zh-MIN":
        case "zh-GAN":
        case "zh-HAK":
        case "zh-HSN":
        case "zh-LZH":
        case "zh-MNP":
        case "zh-MC":
        case "zh-NAN":
        case "zh-WUU":
        case "zh-YUE":
            return ChinaFlag.src

        default:
    }
}