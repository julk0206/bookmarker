FROM eclipse-temurin:21-jdk-jammy

# ADD와 COPY는 모두 외부에서 이미지를 내부로 복사하는 기능
# ADD : tar, tar.gz와 같은 리눅스 파일 자동으로 압축 해제
# COPY : 복사만 함
ADD target/*.jar app.jar

# 파일의 수정 시간을 현재 시간으로 설정
RUN sh -c 'touch /app.jar'

# 애플리케이션이 컨테이너로 실행할 때 내부 포트
EXPOSE 8080

# 애플리케이션이 실행할 명령어
ENTRYPOINT ["sh","-c","java -jar /app.k"]