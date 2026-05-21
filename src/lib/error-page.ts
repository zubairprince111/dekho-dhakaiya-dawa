export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>কোনো একটা ডিশটাপ হইছে মনে হয়।</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #faf8f5; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; font-weight: 900; margin: 0 0 0.5rem; color: #1f2937; }
      p { color: #6b7280; font-weight: 600; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.75rem 1.25rem; border-radius: 1rem; font: inherit; font-weight: 800; cursor: pointer; text-decoration: none; border: 1px solid transparent; transition: all 0.2s; }
      .primary { background: #d97706; color: #fff; }
      .primary:hover { background: #b45309; }
      .secondary { background: #fff; color: #374151; border-color: #e5e7eb; }
      .secondary:hover { background: #f9fafb; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>কোনো একটা ডিশটাপ হইছে মনে হয়।</h1>
      <p>স্যাররা লাঞ্চে গেছেন বা সার্ভার একটু জ্যাম খাইছে, একটু পর আবার ট্রাই মারেন!</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">আবার একটু টিপ দেন তো।</button>
        <a class="secondary" href="/">নিজের ডেরায় চলেন ওস্তাদ</a>
      </div>
    </div>
  </body>
</html>`;
}
