package com.ProjectDev.FitTrack.Serializer;

import java.io.IOException;

import com.ProjectDev.FitTrack.Entity.User;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class UserSerializer extends JsonSerializer<User> {
    @Override
    public void serialize(User user, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("userID", user.getUserID().toString());
        jsonGenerator.writeStringField("name", user.getName());
        jsonGenerator.writeEndObject();
    }
}
