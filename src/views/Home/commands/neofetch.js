module.exports = (ctx = {}) => ({
  description: "View user information",
  stdin: "neofetch",
  stdout: ({ hostname, username }) => {
    const age = Math.floor((Date.now() - ctx.birthday.getTime()) * 3.17098e-11);

    return `
      <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
        <pre style="font-size: 3.5px; line-height: 4px; margin: 0; padding-right: 25px;">
          ${ctx.avatar}
        </pre>

        <div>
          <strong>${username}@${hostname}</strong>
          <br>
          <span>${"-".repeat(username.length + 1 + hostname.length)}</span>

          <ul style="list-style: none; margin: 0; padding: 0;">
            <li>
              <strong>Name: </strong>
              <span>${ctx.name}</span>
            </li>

            <li>
              <strong>Uptime: </strong>
              <span>${age} years</span>
            </li>

            <li>
              <strong>GitHub: </strong>
              <a aria-label="GitHub Profile" href="https://github.com/alexy4744" target="_blank">
                https://github.com/alexy4744
              </a>
            </li>

            <li>
              <strong>Email: </strong>
              <a aria-label="My Email" href="mailto:hello@alexyu.xyz" target="_blank">
                hello@alexyu.xyz
              </a>
            </li>
          </ul>
        </div>
      </div>

      <br>

      <span>Run 'help' to view all commands!</span>
    `;
  }
});
