import data from '../generated/models.json';
import { loadModel } from './loadModel';
import type { Application } from "pixi.js";

export function createCharactersList(
    app: Application,
) {
    const charactersArray = data;
    const entityListBlock = document.getElementById('entity-list');
    
    charactersArray.map((item: any) => {
        let listItem = document.createElement('li');

        let entityButton = document.createElement('button');
        entityButton.textContent = item.name;
        entityButton.setAttribute('type', 'button');
        entityButton.dataset.charId = item.id;

        entityButton.addEventListener('click', async (e: any) => {
            let charId = e.target.dataset.charId;
            
            const newModelPath = `/assets/chars/${charId}/${charId}_l/${charId}_L.model3.json`;

            await loadModel(app, newModelPath);
        });

        listItem.appendChild(entityButton);

        entityListBlock?.appendChild(listItem);
  })
}