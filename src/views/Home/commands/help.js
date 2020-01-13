/* eslint-disable indent */

module.exports = () => ({
  description: "View all available commands",
  stdin: "help",
  stdout: ({ commands }) => {
    let help = "";

    for (const [stdin, { description }] of commands) {
      help += `
        <li>
          <pre style="margin: 0;">${stdin.padEnd(15)} ${description}</pre>
        </li>
      `;
    }

    return `
      <ul style="list-style: none; margin: 0; padding: 0;">
        ${help}
      </ul>
    `;
  }
});
