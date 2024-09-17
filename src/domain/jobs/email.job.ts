
import { EmailService } from "../services/email.services"
import cron from 'node-cron'
import { generateCaseEmailTemplate } from "../templates/email.templates";
import { MonoCase } from "../../data/models/monoCase.model";


export const emailNotificationJob = () => {
    const emailService = new EmailService();
    
    cron.schedule("*/10 * * * * *", async () => {
        try {
            const pendingCases = await MonoCase.find({ isEmailSent: false });
            
            if (pendingCases.length === 0) {
                console.log("No new cases to process.");
                return;
            }

            console.log(`Processing ${pendingCases.length} new cases.`);
            
            await Promise.all(
                pendingCases.map(async (currentCase) => {
                    try {
                        const htmlContent = generateCaseEmailTemplate(
                            currentCase.name,
                            currentCase.description,
                            currentCase.genre,
                            currentCase.age,
                            currentCase.lat, 
                            currentCase.lng
                        );

                        await emailService.sendEmail({
                            to: "Bryanmontoya838@gmail.com", 
                            subject: `New Case: ${currentCase.name} - ${currentCase.description}`, 
                            htmlBody: htmlContent
                        });

                        console.log(`Email successfully sent for case ID: ${currentCase._id}`);
                        
                        const updatedCase = await MonoCase.findByIdAndUpdate(
                            currentCase._id,
                            { isEmailSent: true },
                            { new: true }
                        );

                        console.log(`Case marked as processed for ID: ${currentCase._id}`);

                    } catch (error) {
                        console.error(`Error processing case ID: ${currentCase._id}`, error);
                    }
                })
            );
        } catch (error) {
            console.error("An error occurred while sending email notifications", error);
        }
    });
}