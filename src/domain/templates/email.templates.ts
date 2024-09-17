import { envs } from "../../config/envs.plugin";
export function generateCaseEmailTemplate(name: string, description: string, genre: string, age: number, lat: number, lng: number): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng);
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Case Details</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #eaeaea;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 90%;
                max-width: 800px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border: 5px solid #4a90e2;
                display: flex;
                flex-wrap: wrap;
            }
            .header {
                background-color: #4a90e2;
                color: #ffffff;
                padding: 15px;
                text-align: center;
                width: 100%;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                display: flex;
                flex: 1;
                flex-wrap: wrap;
                padding: 20px;
                font-size: 15px;
                line-height: 1.6;
            }
            .content .column {
                flex: 1;
                min-width: 300px;
                padding: 10px;
            }
            .content .column h2 {
                font-size: 18px;
                color: #4a90e2;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }
            .content p {
                margin: 5px 0;
                color: #555;
            }
            .content strong {
                color: #333;
            }
            .map-img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                margin-top: 15px;
            }
            .footer {
                background-color: #f7f7f7;
                padding: 15px;
                text-align: center;
                font-size: 12px;
                color: #888;
                width: 100%;
            }
            .footer p {
                margin: 0;
            }
            .description {
                font-style: italic;
                color: #666;
                padding: 10px;
                background-color: #f2f2f2;
                border-left: 5px solid #4a90e2;
                border-radius: 6px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Case Information</h1>
            </div>
            <div class="content">
                <div class="column">
                    <h2>Case Details</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Genre:</strong> ${genre}</p>
                    <p><strong>Age:</strong> ${age}</p>
                </div>
                <div class="column">
                    <h2>Location Details</h2>
                    <p><strong>Latitude:</strong> ${lat}</p>
                    <p><strong>Longitude:</strong> ${lng}</p>
                    <img src="${mapboxUrl}" alt="Map Location" class="map-img">
                </div>
            </div>
            <div class="footer">
                <p>This email was automatically generated. Please do not reply.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat: number, lng: number) => {
    const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const zoom = 14; 
    const width = 600; 
    const height = 400; 

    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}