import data from '../list/models.json';
import { loadModel } from './loadModel';
import type { Application } from "pixi.js";

export function createCharactersList(
    app: Application,
) {
    const charactersArray = data;
    const entityListBlock = document.getElementById('entity-list');
    
    charactersArray.map((item: any) => {
        let listItem = document.createElement('li');
        listItem.classList.add('entity-block');

        let characterName = document.createElement('span');
        characterName.classList.add('character-name');
        characterName.textContent = item.name;
        listItem.appendChild(characterName);

        const characterVariantsList = document.createElement('ul');
        characterVariantsList.classList.add('character-variation');
        listItem.appendChild(characterVariantsList);

        item.variants.map((variant: any) => {
            let variantListItem = document.createElement('li');      
            let variantButton = document.createElement('button');

            variantButton.setAttribute('type', 'button');
            variantButton.classList.add('character-variation_button');
            variantButton.textContent = variant.label;
            variantButton.dataset.path = variant.path;

            variantListItem.appendChild(variantButton);
            characterVariantsList.appendChild(variantListItem);

            variantButton.addEventListener('click', async (e: any) => {
                let modelPath = e.target.dataset.path;

                const newModelPath = import.meta.env.BASE_URL + modelPath;

                await loadModel(app, newModelPath);
            });
        });

        entityListBlock?.appendChild(listItem);
  })
}