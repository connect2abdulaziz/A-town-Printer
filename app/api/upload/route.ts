// import { NextRequest, NextResponse } from 'next/server';
// import { put } from '@vercel/blob';
// import nodemailer from 'nodemailer';

// export const runtime = 'nodejs';
// export const maxDuration = 300; // 5 minutes for large files

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const name = formData.get('name') as string;
//     const email = formData.get('email') as string;
//     const files = formData.getAll('files') as File[];

//     if (!files || files.length === 0) {
//       return NextResponse.json(
//         { error: 'No files provided' },
//         { status: 400 }
//       );
//     }

//     // Upload files to Vercel Blob
//     const uploadedFiles = await Promise.all(
//       files.map(async (file) => {
//         const blob = await put(file.name, file, {
//           access: 'public',
//         });
//         return {
//           name: file.name,
//           url: blob.url,
//           size: file.size
//         };
//       })
//     );

//     // Send email notification
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: parseInt(process.env.SMTP_PORT || '587'),
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.SMTP_FROM,
//       to: process.env.NOTIFICATION_EMAIL,
//       subject: 'New Artwork Upload - A-Town Printers',
//       html: `
//         <h2>New Artwork Upload</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <h3>Files:</h3>
//         <ul>
//           ${uploadedFiles.map(f => `
//             <li>
//               <a href="${f.url}">${f.name}</a> (${(f.size / 1024 / 1024).toFixed(2)} MB)
//             </li>
//           `).join('')}
//         </ul>
//       `,
//     });

//     return NextResponse.json({ success: true, files: uploadedFiles });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json(
//       { error: 'Upload failed' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // TODO: process quote request
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Quote request failed" },
      { status: 500 }
    );
  }
}
