const mailForm = (
  projectName: string,
  issueName: string,
  issueId: string,
  eventId: string,
): string => {
  return `
  <div style="max-width:550px; min-width:320px;  background-color: white; border: 1px solid #DDDDDD; margin-right: auto; margin-left: auto;">
    <div style="margin-left:30px;margin-right:30px">
      <p>&nbsp;</p>
      <p><a href="http://santry.tk" style="text-decoration:none;font-weight: bold; color: #3D3D3D;font-size: 15px">Santry 방문하기</a></p>
      <hr style="margin-top:10px;margin-bottom:65px;border:none;border-bottom:1px solid red"/>
      <h1 style="font-weight: normal; color: #2A2A2A; text-align: center; margin-bottom: 65px;font-size: 20px; letter-spacing: 6px;font-weight: normal; border: 2px solid black; padding: 15px;"><span style="color:#2980b9">${projectName}</span> 에서 이벤트가 추가되었습니다.</h1>
      <h2 style="font-weight:500"><span style="color:#2c3e50">${issueName}</span> 항목에 다음 이벤트가 추가되었습니다.</h2>
      <h3 style="color:#34495e">${eventId}</h3>
      <table style="width:100%;">
        <th>
          <td style="width:25%"></td>
          <td style="background-color:black;with:50%;text-align:center;padding:15px"><a href="http://santry.tk/issuedetail/${issueId}" style="margin-left: auto; margin-right: auto;text-decoration:none;color: white;text-align:center;font-weight:600;letter-spacing:2px;background-color:black;padding:15px">이슈 바로가기</a></td>
          <td style="width:25%"></td>
        </th>
      </table>
      <p>&nbsp;</p>
    </div>
  </div>
  `;
};

export default mailForm;
