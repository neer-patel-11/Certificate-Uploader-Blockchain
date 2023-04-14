pragma solidity >=0.5.16;

contract Certificate{
    uint public certiCount = 0; 

    struct Certificate {
        uint id;
        string name;
        string age;
    }

    mapping(uint=> Certificate) public Certificates;

    event CertificateCreated(
        uint id,
        string name,
        string age

    );

   
    function createCertificate(string memory _name,string memory _age)public{
        certiCount++;
        Certificates[certiCount]=Certificate(certiCount,_name,_age);
        emit CertificateCreated(certiCount,_name,_age);
    }

   
    
}
