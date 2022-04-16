import styled from 'styled-components';

export const StyledTable = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 auto;
width: 80%;
  .error-container {
    display: grid;
    place-content: center;
    margin: 40px auto;
    text-align: center;
  }
    .page{
      margin-left: 60%;
      text-transform: uppercase
    }  
    .table {
      font-size: 12px;
      border-collapse: collapse;
      background-color: white;
      box-shadow: ${({ theme }) => theme.boxShadow};
      padding: 5px;
      width: 70%;

      th,
      td {
        text-align: center;
        padding: 0.5em 0.2em;
        position: relative;
        .icon{
          position: absolute;
          right: 0;
          cursor:pointer;
        }
        }
      .table-head {
        color: ${({ theme }) => theme.fontColor};
        background: ${({ theme }) => theme.table200};
        height: 35px;
        font-size: 18px;
        .sortable{
          cursor: pointer;
        }
      }
      .table td {
        border-right: 1px solid #1c80b4;
        font-size: 12px;
        word-break:break-all;
        }
      .table-body{

      .table-row{
        background:${({ theme }) => theme.table100};
        color: ${({ theme }) => theme.fontColor};
      }
      .table-row:nth-child(even) {
        background:${({ theme }) => theme.table200};
        color: ${({ theme }) => theme.fontColor}
      }
      a {
        text-decoration: none;
        color: ${({ theme }) => theme.fontColor};
      }
      }
      }
     
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    position: relative;
    width: 70%;
     .btn-red{
       position: absolute;
       right: 0;
        color: ${({ theme }) => theme.whiteColor};
        background-color: ${({ theme }) => theme.redColor};
        border: none;
        padding: 10px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
      }
  }

  @media only screen and (max-width: 768px) {
    .table-wrapper{
      width: 90%;
    }
    
    th, td{
      max-width: 100%;
    }
    
    .table-head{
      position:absolute;
      top: -9999px;
      left: -9999px;
    }
    
    .cell{
      display: flex;
      align-items: center;
      position:relative;
      font-size: 16px;
      margin-right: 0;
      .cell__content{
        width: 50%;
        text-align: start;
      }
    }
    .cell:before{
      top: 6px;
      left: 6px;
      width: 40%;
      text-align: left;
    }
    .cell:nth-of-type(1):before{content: 'TITLE'}
    .cell:nth-of-type(2):before{content: 'COMPANY'}
    .cell:nth-of-type(3):before{content: 'TECHNOLOGIES'}
    .cell:nth-of-type(4):before{content: 'JOB LINK'}
    .cell:nth-of-type(5):before{content: 'APPLIED'}
    .cell:nth-of-type(6):before{content: 'DATE'}
    .cell:nth-of-type(7):before{content: 'REMOVE'}
    }
  }
`;
