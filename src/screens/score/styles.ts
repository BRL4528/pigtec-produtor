import styled from 'styled-components/native';

export const Container = styled.View`
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 align-items: center;
 /* justify-content: center; */
 padding-top: 30px;

`;

export const SectionVideo = styled.View`
 align-items: center;
 justify-content: center;
 flex-direction: column;
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 /* padding: 24px; */
 padding-bottom: 24px;
 /* padding-top: 24px; */
`;
export const Section = styled.View`
 align-items: center;
 justify-content: center;
 flex-direction: row;
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 /* padding: 24px; */
 padding-bottom: 24px;
`;
export const SectionList = styled.View`
align-items: center;
 flex-direction: row;
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 /* padding: 24px; */
 padding-bottom: 24px;
`;
export const SectionHeader = styled.View`
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 /* padding: 24px; */
 padding: 24px;
`;

export const SectionFlag = styled.View`
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 /* max-height: 380px; */
 margin-top: -35px;
`;
export const ContainerFlag = styled.View`
 flex: 1;
 justify-content: center;
 flex-direction: row;
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 padding: 30px;
 padding-top: 30px;
`;

export const TextCount = styled.Text`
 color: ${({ theme }) => theme.COLORS.YELLOW_200};
 font-size: 22px;
`;

export const TextFps = styled.Text`
 color: #fff;
`;
export const TextFlag = styled.Text`
 color: #fff;
 margin-left: 10px;
`;

export const Button = styled.TouchableOpacity`
 /* flex: 1; */

 height: 56px;
 width: 56px;

 background-color: ${({ theme }) => theme.COLORS.GREEN_200};
 
 border-radius: 32px;

 align-items: center;
 justify-content: center;
 text-align: center;
 margin-top: 30px;
 margin: 15px;
`;
export const ButtonYellow = styled.TouchableOpacity`
 /* flex: 1; */

 height: 56px;
 width: 56px;

 background-color: ${({ theme }) => theme.COLORS.YELLOW};
 
 border-radius: 32px;

 align-items: center;
 justify-content: center;

 margin-top: 30px;
 margin: 15px;
`;

export const Title = styled.Text`
 font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
 color: ${({ theme }) => theme.COLORS.WHITE};
`;
export const ButtonBlue = styled.TouchableOpacity`
 /* flex: 1; */

 height: 56px;
 width: 56px;

 background-color: ${({ theme }) => theme.COLORS.BLUE_500};
 
 border-radius: 32px;

 align-items: center;
 justify-content: center;

 margin-top: 30px;
 margin: 15px;
`;

export const SectionTop = styled.View`
   align-items: center;
   flex-direction: row;
   justify-content: space-between;
   width: 90%;
`;

export const ButtonBack = styled.TouchableOpacity`
 /* width: 50px; */
 padding: 10px;
`;

export const Loading = styled.ActivityIndicator`
 position: absolute;
`
