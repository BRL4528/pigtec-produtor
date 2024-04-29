import styled from 'styled-components/native';

export const Container = styled.View`
 background-color: ${({ theme }) => theme.COLORS.GRAY_600};
 align-items: center;
 /* justify-content: center; */
 padding: 10px 15px  15px  15px;
 flex: 1;
 min-width: 100%;
`;

export const ConatonerHeader = styled.View`
 /* justify-content: space-between; */
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: red;
 padding-top: 30px;
 padding-left: 20px;
 padding-right: 20px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Header = styled.Text`
 font-size: 18px;
 color: #d7d7d8;

 /* background-color: ${({ theme }) => theme.COLORS.GRAY_600}; */

 /* padding-top: 60px; */
 /* padding-left: 20px; */
`;

export const Button = styled.TouchableOpacity`
 /* flex: 1; */
 /* z-index: 1; */

 height: 56px;
 width: 56px;

 border-radius: 32px;

 align-items: center;
 justify-content: center;
 text-align: center;
 /* margin-top: 30px;
 margin: 15px; */
 /* padding-top: 30px; */
 
`;

export const ContainerList = styled.View`
align-items: center;
background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;
export const Text = styled.Text`
color: ${({ theme }) => theme.COLORS.WHITE};
`;