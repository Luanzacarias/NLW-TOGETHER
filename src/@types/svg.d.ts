// basicamente estamos declarando uma tipagem universal para determidados arquivos
declare module "*.svg" {
    import React from 'react';
    import { Rect, SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

// é um componente funcional