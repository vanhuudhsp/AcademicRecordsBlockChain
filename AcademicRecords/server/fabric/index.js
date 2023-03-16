//fabric
import FabricCAServices from 'fabric-ca-client';
import { Wallets, Gateway } from 'fabric-network';
import fs from 'fs';
import path from 'path';
import constants from '../constants.js';
export const createUserAdmin = async (userName)=>
{
    try {
        // load the network configuration
        const ccpPath = path.resolve('..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        //console.log(ccp);
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(userName);
        if (identity) {
            throw new Error(`An identity for the admin user ${userName} already exists in the wallet`);
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: userName, enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(userName, x509Identity);
        console.log(`Successfully enrolled admin user ${userName} and imported it into the wallet`);

    } catch (error) {
        throw new Error(`Failed to enroll admin user "admin": ${error}`);
    }
}

export const createUserFabric = async (userLogin, newUser) => {
    try {
        //console.log("[Fabric-userLogin]",userLogin);
        //console.log("[Fabric-newUser]",newUser);
        // load the network configuration
        const ccpPath = path.resolve('..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(newUser.email);
        if (userIdentity) {
            throw new Error(`An identity for the user ${newUser.email} already exists in the wallet`);
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get(userLogin.email);
        if (!adminIdentity) {
            throw new Error(`An identity for the admin user ${userLogin.email} does not exist in the wallet`);
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, userLogin.email);

        // Register the user, enroll the user, and import the new identity into the wallet.
        let registerAttrs = [
            {
                name: "userName",
                value: newUser.email,
                ecert: true
            },
            {
                name: "firstName",
                value: newUser.firstName,
                ecert: true
            },
            {
                name: "lastName",
                value: newUser.lastName,
                ecert: true
            },
            {
                name: "department",
                value: newUser.department,
                ecert: true
            },
            {
                name: "position",
                value: newUser.position,
                ecert: true
            },
        ];
        const secret = await ca.register({            
            enrollmentID: newUser.email,
            role: newUser.role,
            attrs:registerAttrs 
        }, adminUser);
        // console.log("Create user blockchain - ",user);
        const enrollment = await ca.enroll({
            enrollmentID: newUser.email,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        // console.log(enrollment);
        await wallet.put(newUser.email, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${newUser.email} and imported it into the wallet`);
    } catch (error) {
        throw new Error(`Failed to register user ${newUser.email}: ${error}`);
    }
    
}


export const queryFabric = async function main(userLogin, data, query) {
    try {
        
        console.log("[Fabric-queryFabric-data]",data, query );
        // load the network configuration
        const ccpPath = path.resolve( '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userLogin.email);
        if (!identity) {
            throw new Error(`An identity for the user ${userLogin.email} does not exist in the wallet`);
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userLogin.email, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        
        // Get the contract from the network.
        const contract = network.getContract('academicrecord');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        let result;
        switch (query) {
            case constants.queryAllStudent:
                result = await contract.evaluateTransaction('queryAllStudent');
                console.log(`Transaction fsfs  has been evaluated, result is: ${result.toString()}`);
                // Disconnect from the gateway.
                await gateway.disconnect();
                return result.toString();
            case constants.createStudent:
                {
                    const {studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image} = data;
                    await contract.submitTransaction('createStudent', studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image);
                    console.log('Transaction has been submitted');
                    // Disconnect from the gateway.
                    await gateway.disconnect();
                    
                };
                break;
            case constants.updateStudent:
                {
                    const {studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image} = data;
                    await contract.submitTransaction('updateStudent', studentID,fullName,dateOfBirth,gender,phone,email,status,className,department,majors,shoolYear,totalCredits,accumulatedCredits,idNumber,dateOfIssue,placeOfIssue,image);
                    console.log('Transaction has been submitted');
                    // Disconnect from the gateway.
                    await gateway.disconnect();
                }
                break;
            case constants.createCourse:
                {
                    const {courseID, courseName, totalCredits} = data;
                    await contract.submitTransaction('createCourse', courseID, courseName, totalCredits);
                    console.log('Transaction has been submitted');
                    // Disconnect from the gateway.
                    await gateway.disconnect();
                };
                break;
            case constants.updateCourse:
                {
                    const {courseID, courseName, totalCredits} = data;
                    await contract.submitTransaction('updateCourse', courseID, courseName, totalCredits);
                    console.log('Transaction has been submitted');
                        // Disconnect from the gateway.
                    await gateway.disconnect();
                };
                    break;
            case constants.queryAllCourse:
                result = await contract.evaluateTransaction('queryAllCourse');
                //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                // Disconnect from the gateway.
                await gateway.disconnect();
                return result.toString();
            case constants.queryScoreByLecturer:
                result = await contract.evaluateTransaction('queryScoreByLecturer');
                //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                // Disconnect from the gateway.
                await gateway.disconnect();
                return result.toString();
            case constants.createScore:
                {
                    const {studentID, courseID, grade} = data;
                    console.log(data);
                    await contract.submitTransaction('createScore', studentID, courseID, grade);
                    console.log('Transaction has been submitted');
                    // Disconnect from the gateway.
                    await gateway.disconnect();
                }
                break;
            case constants.createDegree:
                {
                    const {degreeID,degreeName,studentID,degreeDate,modeOfStudy,signer,image} = data;
                    console.log(data);
                    await contract.submitTransaction('createDegree', degreeID,degreeName,studentID,degreeDate,modeOfStudy,signer,image);
                    console.log('Transaction has been submitted');
                    // Disconnect from the gateway.
                    await gateway.disconnect();
                }
                break; 
            case constants.queryAllDegreeByCreated:
                result = await contract.evaluateTransaction("queryAllDegreeByCreated");
                //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                // Disconnect from the gateway.
                await gateway.disconnect();
                console.log(result.toString());
                return result.toString();
            default:
                break;
        }
    } catch (error) {
        throw new Error(`Failed to submit transaction: ${error}`);
    }
}

