import styled from 'styled-components'
import palette from '../style/palette';
import {Link} from 'react-router-dom';

export default function Setting() {

    const SettingPageContainer = styled.div`
        margin-top: 5px;
        .settingSecionText {
            margin: 20px;
        }
        .settingInfo {
            margin-top: 50px;
        }
        .settingInfoTitle {
            font-size: 17px;
            font-weight: bold;
        }
        .settingInfoContent {
            font-size: 15px;
            margin-top: 5px;
            color: ${palette.darkgray};
        }
    `;

    const ContentTitleContainer = styled.div`
        background-color: white;
        height: 60px;
        display: flex;
        align-items: center;
    ` 

    const ContentListContainer = styled(Link)`
        background-color: ${palette.lightgray};
        height: 50px;
        display: flex;
        align-items: center;
        }
    `;

    return (
        <SettingPageContainer>
            <ContentTitleContainer>
                <p className='settingSecionText'>고객센터</p>
            </ContentTitleContainer>

            <ContentListContainer to={'/setting/help'}>
                <p className='settingSecionText'>고객센터</p>
            </ContentListContainer>

            <ContentListContainer to={'/setting/contact'}>
                <p className='settingSecionText'>문의 및 제보/제안</p>
            </ContentListContainer>


            <ContentTitleContainer>
                <p className='settingSecionText'>이용안내</p>
            </ContentTitleContainer>

            <ContentListContainer to={'/setting/aboutus'}>
                <p className='settingSecionText'>회사소개</p>
            </ContentListContainer>

            <ContentListContainer to={'/setting/policy'}>
                <p className='settingSecionText'>이용약관</p>
            </ContentListContainer>

            <ContentListContainer to={'/setting/license'}>
                <p className='settingSecionText'>오픈소스 라이센스</p>
            </ContentListContainer>

            <div className='settingSecionText settingInfo'>
                <div>
                    <p className='settingInfoTitle'>회사명: (주)Muntic</p>
                </div>
                <br></br>
                <p className='settingInfoContent'>대표메일: munetic@gmail.com</p>
                <p className='settingInfoContent'>대표번호: 010-1234-1234</p>
                <p className='settingInfoContent'>등록번호: 가-나-다-123</p>
                <p className='settingInfoContent'>대표명: gutenMorgen</p>
            </div>

        </SettingPageContainer>
    )
}