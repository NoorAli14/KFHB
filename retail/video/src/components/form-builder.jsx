
import React from 'react'

export const FormBuilder=({question})=>{
    const field='';
    switch (question.type) {
        case 'text':
            field= <input type="text"/>
            break;
        case 'checkbox':
            field= <input type="checkbox"/>
            break;
    
        default:
            break;
    }
}