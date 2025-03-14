import { LitElement, html, css } from 'lit';
import { players } from '../players';
class PlayerList extends LitElement {
    render() {
        return html `
            <ul>
                ${players.map(player => html `
                    <li>${player.name} - ${player.position}</li>
                `)}
            </ul>
        `;
    }
}
PlayerList.styles = css `
        /* ...existing styles... */
    `;
customElements.define('player-list', PlayerList);
//# sourceMappingURL=playerlist.js.map